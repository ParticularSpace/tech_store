type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
    return (
      <div className={`fixed inset-0 z-50 overflow-auto bg-smoke-light flex ${isOpen ? '' : 'hidden'}`} onClick={onClose}>
        <div className="relative p-6 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
          <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form>
            <input className="p-2 mb-3 border rounded-lg w-full" type="text" placeholder="Username" />
            <input className="p-2 mb-3 border rounded-lg w-full" type="password" placeholder="Password" />
            <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignInModal;
  