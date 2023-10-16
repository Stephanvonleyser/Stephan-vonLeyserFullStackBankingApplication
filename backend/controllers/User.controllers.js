import User from '../models/User.model.js'
import jwtGenerator from '../helpers/jwtGenerate.js'
import accountGenerate from '../helpers/accountGenerate.js';



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
		//Generar nro de cuante unico para el usuario
		const accountNumber = accountGenerate();
		const user = new User({
            ...req.body, //req.body es donde está almacenado en obj postman
            accounts: [{
                accountNumber: accountNumber,
                balance: 100 // Initial balance of 100
            }]
        }); 
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
		res.status(400).json({
			success: false,
			message: "User does not exist. Please, sign up."
		});
	}


	//Comprobar su password
	if( await user.checkPassword(password)) {
		res.json({
			success: true,
			user: {
				_id: user._id,
				userName: user.userName,
				email: user.email,
				role: user.role,
				accounts: user.accounts
			},
			token: jwtGenerator(user._id)
		});

	} else {
		res.status(403).json({
			success: false,
			message: "Incorrect Password"
		});
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

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role !== 9) {
            return res.status(403).json({ success: false, message: 'User is not an admin' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};






export {createNewUser, authUser, userProfile, otherProfile, checkAdmin}