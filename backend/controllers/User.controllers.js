import User from '../models/User.model.js'
import jwtGenerator from '../helpers/jwtGenerate.js'
import accountGenerate from '../helpers/accountGenerate.js';



const createNewUser = async (req, res) => {
	console.log(req.body);
	console.log(req.headers);
	console.log(User);
	const { email } = req.body;
	const haveUserEmail = await User.findOne({ email }) //<= metodo que encuentra el primero que coincida
	console.log("Found user with email:", haveUserEmail);
	if(haveUserEmail) {
		const error = new Error('Your email is alredy registered');
		return res.status(403).json({ msg: error.message })
	}



	try {
		//Crear el objeto y almacenarlo
		//Generar nro de cuante unico para el usuario
		const accountNumber = accountGenerate();
		console.log(accountNumber);
		const user = new User({
            ...req.body, //req.body es donde está almacenado en obj postman
            accounts: [{
                accountNumber: accountNumber,
                balance: 100 // Initial balance of 100
            }]
        }); 
		await user.save()
		console.log("User after save:", user);
		res.json({ success: true, user: user });
	}
	catch (error) {
		return res.status(401).json({ msg: error.message })
	}
} 

const authUser = async (req, res) => {	
	
	console.log(`Received email: ${req.body.email}`);
	//Traemos las variables
	const { email, password } = req.body
	

	// //Saber si el User existe
	const user = await User.findOne({ email })

	console.log('Found user:', user);

	if(!user) {
        console.log('User not found in the database.');
        return res.status(400).json({
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

		console.log(req.headers);
		console.log(req.body);
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