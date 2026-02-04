# EmailJS Setup Guide for Portfolio Contact Form

## ✅ What's Already Configured

Your portfolio is now integrated with EmailJS using:
- **Service ID**: `service_23xk5bg`
- **Email**: `iamzohaibali07@gmail.com`

## 📝 What You Need to Do

### Step 1: Get Your Public Key
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Navigate to **Account** → **General** → **API Keys**
3. Copy your **Public Key**

### Step 2: Update Your HTML File
Open `index.html` and replace `YOUR_PUBLIC_KEY` with your actual public key:

```html
<script>
  (function(){
    emailjs.init("YOUR_PUBLIC_KEY");  // Replace this
  })();
</script>
```

### Step 3: Create Email Template
1. In EmailJS Dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Set the template content as:

**Subject**: New message from portfolio

**Body**:
```
New message from portfolio:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Set **To Email** to: `iamzohaibali07@gmail.com`
5. **Save** the template and copy the **Template ID**

### Step 4: Update Your JavaScript File
Open `script.js` and replace `YOUR_TEMPLATE_ID` with your actual template ID:

```javascript
emailjs.send("service_23xk5bg", "YOUR_TEMPLATE_ID", {  // Replace this
    from_name: nameInput.value,
    from_email: emailInput.value,
    message: messageInput.value
})
```

## 🎯 Files Modified

1. **index.html** - Added EmailJS CDN and initialization script
2. **script.js** - Updated contact form to use EmailJS instead of console.log

## 🧪 Testing

After completing the setup:
1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email at `iamzohaibali07@gmail.com`
5. You should receive the message!

## 🟢 Expected Result

✔ User submits form  
✔ Email goes to your Gmail  
✔ Works on GitHub Pages  
✔ No backend needed

## 🔧 Troubleshooting

- **Form not sending?** Check browser console for errors
- **No email received?** Verify your template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- **Wrong email address?** Make sure "To Email" is set to `iamzohaibali07@gmail.com` in the template settings
