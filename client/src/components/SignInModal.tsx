type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form>
        <input className="p-2 mb-3 border rounded-lg w-full" type="text" placeholder="Email" />
        <input className="p-2 mb-3 border rounded-lg w-full" type="password" placeholder="Password" />
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">Sign In</button>
      </form>
      <br />
      <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="button" onClick={onRegister}>
        Register
      </button>
    </div>
  );
};

export default SignInModal;
