import User from '../models/User.model.js'

const deposit = async (req, res) => {
    const { amount, accountNumber } = req.body;

    try {
        let user = await User.findOne({ "accounts.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ msg: "Account not found" });
        }

        const account = user.accounts.id(accountNumber);
        account.balance += parseFloat(amount);

        await user.save();
        res.json({ msg: "Deposit successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const withdraw = async (req, res) => {
    const { amount, accountNumber } = req.body;

    try {
        let user = await User.findOne({ "accounts.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ msg: "Account not found" });
        }

        const account = user.accounts.id(accountNumber);
        if (account.balance < parseFloat(amount)) {
            return res.status(400).json({ msg: "Insufficient funds" });
        }
        account.balance -= parseFloat(amount);

        await user.save();
        res.json({ msg: "Withdrawal successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const transfer = async (req, res) => {
    const { amount, originAccountNumber, destEmail, destAccountNumber } = req.body;

    try {
        let originUser = await User.findOne({ "accounts.accountNumber": originAccountNumber });
        let destUser = await User.findOne({ email: destEmail, "accounts.accountNumber": destAccountNumber });

        if (!originUser || !destUser) {
            return res.status(404).json({ msg: "Account not found" });
        }

        const originAccount = originUser.accounts.id(originAccountNumber);
        const destAccount = destUser.accounts.id(destAccountNumber);

        if (originAccount.balance < parseFloat(amount)) {
            return res.status(400).json({ msg: "Insufficient funds" });
        }

        originAccount.balance -= parseFloat(amount);
        destAccount.balance += parseFloat(amount);

        await originUser.save();
        await destUser.save();
        res.json({ msg: "Transfer successful", user: originUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export {transfer, deposit, withdraw}