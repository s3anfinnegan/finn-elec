# Frontend 
- Built to be responsive using React Vite
- Hosted on GitHub Pages
- User fills out the QuoteForm to request a free quote from Volt Safe for a job
- POST request is sent to /send-quote

# Backend
- Simple Node server using Express for handling the QuoteForm requests
- Hosted on Render (Web Services)
- Receives the POST request and uses SendGrid to email info@voltsafe.ie with new request for quotation

# Hosting
- Bought the custom domain name (www.voltsafe.ie) on Hosting Ireland, along with the email service
- Set up the DNS within Hosting Ireland to map the GH Pages URL to voltsafe.ie (CNAME and A Records)


