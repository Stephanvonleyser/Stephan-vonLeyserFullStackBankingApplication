const accountGenerate = () => {

    // Get current date and time
    const now = new Date();
    // Get weekday number (1 for Monday, 7 for Sunday)
    const weekday = (now.getUTCDay() === 0) ? 7 : now.getUTCDay();
    // Get the current hour (in UTC)
    const hour = now.getUTCHours().toString().padStart(2, '0');
    // Construct the 3-character prefix
    const prefix = `${weekday}${hour}`;

    let account = prefix;
    const possible = '0123456789';
    for (let i = 0; i < 10; i++) {
        account += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return account;
}

export default accountGenerate;