import { useState } from "react";
import { toast } from "react-toastify";

function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNo: "",
        password: "",
    });

    const [errors,setErrors] = useState({});

    const changeHandler = (e) => {
        // console.log(e.target);

        let {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }));
    };

    const validateForm = () => {
        let isValidName = /^[a-zA-Z ]+$/;
        let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValidContact = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
        let isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

        let {name,email,password,contactNo} = formData;

        let formErrors = {}
        //Name Validation
        if(name.trim().length < 2){
            formErrors.name = "Name alteast 2 character long..."
        }

        if(!isValidName.test(name)){
            formErrors.name = "Invalid Name..."
        }

        //email validation
        if(!isValidEmail.test(email)){
            formErrors.email = "Invalid Email..."
        }

        //contact validation
        if(!isValidContact.test(contactNo)){
            formErrors.contactNo = "Invalid ContactNo."
        }

        //password validation
        if(!isValidPassword.test(password)){
            formErrors.password = "Invalid Password..."
        }

        return formErrors;
    };

    const submitForm = (e) => {
        e.preventDefault()
        
        const validation = validateForm()
        setErrors(validation)

        if(Object.keys(validation).length === 0){
            // alert("Form submitted ✅");
            toast.success("Form Submitted ✅")
            setFormData({
                name: "",
                email: "",
                contactNo: "",
                password: "",
            });
        }
    };

    return (
        <form className="flex flex-col w-sm border-4 border-gray-500 mx-auto mt-10 p-5 rounded-2xl gap-1" onSubmit={submitForm}>
            <h1 className="text-3xl font-bold text-center mb-2 text-blue-600 ">Registration Form</h1>

            <label htmlFor="name" className="font-semibold">Name-: </label>
            <input type="text" placeholder="Enter Your Name..." id="name"
                value={formData.name}
                name="name" className="border-2 border-gray-400 rounded p-1" onChange={changeHandler} />
                {
                    errors.name && <span className="text-red-700 font-semibold">{errors.name}</span>
                }

            <label htmlFor="email" className="font-semibold">Email-: </label>
            <input type="email" placeholder="Enter Your Email..." id="email"
                value={formData.email}
                name="email" className="border-2 border-gray-400 rounded p-1" onChange={changeHandler} />
                {
                    errors.email && <span className="text-red-700 font-semibold">{errors.email}</span>
                }

            <label htmlFor="contact" className="font-semibold">Contact No-: </label>
            <input type="tel" placeholder="Enter Your Contact..." id="contact"
                value={formData.contactNo}
                name="contactNo" className="border-2 border-gray-400 rounded p-1" onChange={changeHandler} />
                {
                    errors.contactNo && <span className="text-red-700 font-semibold">{errors.contactNo}</span>
                }

            <label htmlFor="pass" className="font-semibold">Password-: </label>
            <input type="text" placeholder="Enter Your Name..." id="pass"
                value={formData.password}
                name="password" className="border-2 border-gray-400 rounded p-1" onChange={changeHandler} />
                {
                    errors.password && <span className="text-red-700 font-semibold">{errors.password}</span>
                }

            <button className="bg-sky-700 text-white py-2 mt-4 rounded-lg font-semibold text-lg cursor-pointer hover:bg-sky-500">
                Register
            </button>

        </form>
    )
}

export default Form;