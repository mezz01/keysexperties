import React, { useState, useEffect, useCallback } from 'react';

const Form = ({ yourEmail }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    // Form input states
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');

    const deliveryMessage = "due to high demand, you will receive your key in a maximum span of 6 hours";

    const openModalWithProduct = useCallback((pName, pPrice) => {
        setProductName(pName);
        setProductPrice(pPrice);
        // Reset form fields
        setName('');
        setCountry('');
        setEmail('');
        setIsVisible(true);
        document.body.classList.add('modal-open'); // Prevent background scroll
    }, []);

    const closeModal = useCallback(() => {
        setIsVisible(false);
        document.body.classList.remove('modal-open'); // Restore background scroll
    }, []);

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
    }, [isVisible, closeModal]); // Added closeModal to dependency array


    if (!isVisible) {
        return null;
    }

    const paypalLink = `http://paypal.me/OBHSOFTWARE/${productPrice}`;
    const autoresponseMessage = `Thank you for your order ${name}, we received your order of ${productName} and you will receive your full document (key + installation guide) in maximum 6 hours after paypal payment. If you have any questions, please contact us.`;
    const emailSubjectForYou = `New License Purchase: ${productName} - Price: $${productPrice}`;

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={closeModal} 
        >
            <div 
                className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all"
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-6 text-center">
                    Order: {productName}
                </h2>
                
                <form action={`https://formsubmit.co/${yourEmail}`} method="POST">
                   
                    <input type="hidden" name="_next" value={paypalLink} />
                    <input type="hidden" name="_autoresponse" value={autoresponseMessage} />
                    <input type="hidden" name="_subject" value={emailSubjectForYou} />
                    
                    <input type="hidden" name="Product Name" value={productName} />
                    <input type="hidden" name="Price" value={`$${productPrice}`} />
                    
                    <input type="text" name="_honey" style={{ display: 'none' }} />
                    <input type="hidden" name="_captcha" value="false" /> 
                    

                    <div className="mb-5">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            id="fullName" 
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
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow sm:text-sm" 
                            required 
                            placeholder="Your Email (where your order will be delivered)"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg flex flex-col items-center"
                    >
                        <span>BUY NOW & PAY ${productPrice}</span>
                        <span className="text-xs font-normal mt-1 leading-snug opacity-90">
                            {deliveryMessage}
                        </span>
                    </button>
                     <p className="text-xs text-gray-500 mt-4 text-center">
                        You will be redirected to PayPal to complete your payment.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;