import User from '../models/User.model.js'
import tokenIdGenerate from '../helpers/tokenIdGenerate.js'
import jwtGenerator from '../helpers/jwtGenerate.js'



const createNewUser = async (req, res) => {
	console.log(req.body);
	const { email } = req.body;
	const haveUserEmail = await User.findOne({ email }) //<= metodo que encuentra el primero que coincida
	
	if(haveUserEmail) {
		const error = new Error('Your email is alredy registered');
		return res.status(403).json({ msg: error.message })
	}

	try {
		//Crear el objeto y almacenarlo
		const user = new User(req.body) //req.body es donde está almacenado en obj postman
		//Generamos el token y añadimos al objeto User que hemos creado
		user.token = tokenIdGenerate()
		await user.save()


		res.json(user)
	}
	catch (error) {
		error = new Error('Failed to create User');
		return res.status(401).json({ msg: error.message })
	}
} 

const authUser = async (req, res) => {	
	//Traemos las variables
	const { email, password } = req.body

	// //Saber si el User existe
	const user = await User.findOne({ email })

	if(!user) {
		const error = new Error('User does not exist. Please, sign up.');
		return res.status(400).json({ msg: error.message })
	}


	//Comprobar su password
	if( await user.checkPassword(password)) {
		res.json( {
			_id: user._id,
			userName: user.userName,
			email: user.email,
			token: jwtGenerator(user._id)
		})

	} else {
		const error = new Error('Incorrect Passowrd');
		return res.status(403).json({ msg: error.message })
	}

}

// Función para confirmar la cuenta con el token 
const confirmTokenUser = async (req, res) => {

	const { token } = req.params

	//Evaluando el token buscando Users con ese token
	const haveUserTokenConfirm = await User.findOne({ token })
	
	// Si no existe:
	if(!haveUserTokenConfirm) {
		const error = new Error('Token is not valid');
		return res.status(403).json({ msg: error.message })
	}

	//si existe almacenamos en confirm el true y 
	//eliminamos el token porque va a ser de un solo uso
	try {
		
		haveUserTokenConfirm.tokenConfirm = true; 
		haveUserTokenConfirm.token = ''; 
		await haveUserTokenConfirm.save()
		res.json({ msg: 'Account confirm!'})

	} catch (error) {
		error = new Error('No can confirm account');
		return res.status(403).json({ msg: error.message })

	}
}


const checkTokenUser = async (req, res) => {
	
	const { token } = req.params

	const haveUserValidToken = await User.findOne( {token})

	if(haveUserValidToken) {
		res.json( { msg: 'Confirm account'})
	} else {
		const error = new Error('Token is not valid');
		return res.status(404).json({ msg: error.message })
	}
}

const userProfile = async (req, res) => {

	const { User } = req
	res.json(User)
}

const otherProfile = async (req, res) => {
	const { User } = req
	res.json(User)
}

export {createNewUser, authUser, confirmTokenUser,  checkTokenUser,  userProfile, otherProfile}