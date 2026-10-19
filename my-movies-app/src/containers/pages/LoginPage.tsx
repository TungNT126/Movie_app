import BackDrop from "../../assets/img/backdrop_login.jpg";
import RegisterForm from "../../component/Modal/RegisterForm";
import { useState } from "react";

function LoginPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  function signUp() {
    setIsSignUpOpen(true);
  }

  return (
    <>
      <div
        className="h-screen w-[100%] flex flex-col justify-end items-center"
        style={{
          backgroundImage: `url(${BackDrop})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          boxShadow:
            "inset 80px 80px 60px -20px rgba(33, 36, 38, 0.8), inset -80px -80px 60px -20px rgba(33, 36, 38, 0.8)",
        }}
        // inset (shadow nằm trong ảnh)
        //  trục x ("+" - phải trái, "-" - trái, phải)
        // trục y ("+", "-" - trên dưới)
        // blur (càng lớn càng nhòe mờ)
        // spread (độ lan rộng)
        // color
      >
        <div style={{ transform: "translateY(80%)" }}>
          <div className="text-[36px] text-white relative">
            <p>Track films you’ve watched.</p>
            <p>Save those you want to see.</p>
            <p>Tell your friends what’s good.</p>
          </div>
          <button
            className="cursor-pointer bg-primary-btn text-white text-lg font-bold py-2 px-6 my-10 rounded-lg hover:opacity-80"
            type="submit"
            onClick={signUp}
          >
            Get started - it's free!
          </button>
        </div>
      </div>
      <RegisterForm
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
}

export default LoginPage;
