// import React, { useState } from 'react';
// import axios from 'axios';

// const ResetPassword = ({ props }) => {
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleResetPassword = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/reset-password', {
//                 password,
//                 confirmPassword,
//                 token: props.params.token
//             });
//             setMessage(response.data.message);
//         } catch (error) {
//             console.error(error);
//             setMessage("Error: Failed to reset password");
//         }
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleResetPassword}>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" required />
//                 <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ResetPassword;
