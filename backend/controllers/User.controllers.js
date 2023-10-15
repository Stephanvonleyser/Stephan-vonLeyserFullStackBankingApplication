import User from '../models/User.model.js'
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


const userProfile = async (req, res) => {

	const { User } = req
	res.json(User)
}

const otherProfile = async (req, res) => {
	const { User } = req
	res.json(User)
}

const checkAdmin = async (req, res) => {
	//TODO: Check if user is admin
}

export {createNewUser, authUser, userProfile, otherProfile, checkAdmin}