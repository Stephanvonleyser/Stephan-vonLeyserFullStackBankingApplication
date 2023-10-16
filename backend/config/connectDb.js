import mongoose from "mongoose"


//Connect to our DB
export const connectBD = async () => {
    try {
		const connection = await mongoose.connect(process.env.DB_URI, 
			{
				useNewUrlParser: true,
				useUnifiedTopology:true
			});
            const url = `${connection.connection.host}:${connection.connection.port}`
            console.log(`MongoDB conecta en: ${url}`)
		}
    catch (error) {
        console.log(`error: ${error.message}`)
		process.exit(1) // usually node ends proceess with 0.Force process to end.
    }
}