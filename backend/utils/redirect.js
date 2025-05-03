//Template for generating a redirect HTML page with a countdown timer and a cancel button

const generateRedirectHtml = (shortUrl, originalUrl, frontendUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Redirecting...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { max-width: 600px; margin: auto; }
            button { padding: 10px 20px; margin-top: 20px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>You are being redirected...</h2>
            <p>Short URL: ${shortUrl}</p>
            <p>Destination: ${originalUrl}</p>
            <p>Redirecting in <span id="countdown">3</span> seconds...</p>
            <button onclick="window.location.href='${frontendUrl}'">Cancel</button>
        </div>
        <script>
            let seconds = 3;
            const countdown = document.getElementById('countdown');
            const interval = setInterval(() => {
                seconds--;
                countdown.textContent = seconds;
                if (seconds <= 0) {
                    clearInterval(interval);
                    window.location.href = '${originalUrl}';
                }
            }, 1000);
        </script>
    </body>
    </html>
    `;
};

module.exports = { generateRedirectHtml };