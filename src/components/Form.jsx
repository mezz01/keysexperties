import React, { useState, useEffect, useCallback } from 'react';

const Form = ({ yourEmail }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    // Form input states
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');

    const openModalWithProduct = useCallback((pName, pPrice) => {
        setProductName(pName);
        setProductPrice(pPrice);
        // Reset form fields
        setName('');
        setCountry('');
        setEmail('');
        setIsVisible(true);
    }, []);

    const closeModal = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        // Expose the function to open the modal globally
        window.triggerPurchaseForm = openModalWithProduct;

        // Cleanup the global function when the component unmounts
        return () => {
            delete window.triggerPurchaseForm;
        };
    }, [openModalWithProduct]);

    // Close modal on Escape key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        if (isVisible) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isVisible]);


    if (!isVisible) {
        return null;
    }

    const paypalLink = `http://paypal.me/OBHSOFTWARE/${productPrice}`;
    const autoresponseMessage = `Thank you for your interest in ${productName}! Please complete your payment via PayPal. Your order for ${productName} at $${productPrice} will be processed upon payment confirmation. If you have any questions, please contact us.`;
    const emailSubjectForYou = `New License Purchase: ${productName} - Price: $${productPrice}`;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal} // Close if overlay is clicked
        >
            <div 
                className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
            >
                <button 
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-6 text-center">
                    Order: {productName}
                </h2>
                
                <form action={`https://formsubmit.co/${yourEmail}`} method="POST">
                    {/* FormSubmit Hidden Fields */}
                    <input type="hidden" name="_next" value={paypalLink} />
                    <input type="hidden" name="_autoresponse" value={autoresponseMessage} />
                    <input type="hidden" name="_subject" value={emailSubjectForYou} />
                    
                    {/* Optional: Send product name and price in the email to yourself */}
                    <input type="hidden" name="Product" value={productName} />
                    <input type="hidden" name="Price" value={`$${productPrice}`} />
                    
                    {/* Honeypot for spam */}
                    <input type="text" name="_honey" style={{ display: 'none' }} />
                    {/* Optional: Disable reCAPTCHA if you trust your users or have other spam prevention */}
                    {/* <input type="hidden" name="_captcha" value="false" /> */}

                    <div className="mb-5">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow sm:text-sm" 
                            required 
                            placeholder="Your Full Name"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input 
                            type="text" 
                            name="country" 
                            id="country" 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow sm:text-sm" 
                            required 
                            placeholder="Your Country"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email" // This 'name="email"' is crucial for FormSubmit's _replyto and _autoresponse
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow sm:text-sm" 
                            required 
                            placeholder="Your Email for Confirmation & License"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg"
                    >
                        BUY NOW & PAY ${productPrice}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;