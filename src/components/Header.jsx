import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import { addUsers, removeUser } from "../utils/userSlice";
import { toggleGPT } from "../utils/gptSlice";
import { ToggleLang } from "../utils/configSlice";

import { bgImage, SupportedLang } from "../utils/Constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGPT = useSelector((store) => store.gpt?.IsGptSlice);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName, photoURL } = firebaseUser;

        dispatch(
          addUsers({
            uid,
            email,
            displayName,
            photoURL,
          }),
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGPT = () => {
    dispatch(toggleGPT());
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleChange = (e) => {
    dispatch(ToggleLang(e.target.value));
  };

  const userName = user?.displayName || "User";

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full
        bg-gradient-to-b
        from-black
        via-black/95
        to-transparent
        px-4
        py-3
        md:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-4
        "
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/browse")}
          aria-label="Go to home"
          className="
            shrink-0
            cursor-pointer
            transition-transform
            duration-200
            hover:scale-105
          "
        >
          <img
            src={bgImage}
            alt="Netflix"
            className="
              w-28
              object-contain
              sm:w-32
              md:w-36
              lg:w-40
            "
          />
        </button>

        {/* Right Section */}
        {user && (
          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
            "
          >
            {/* Language Selector */}
            {showGPT && (
              <div className="relative hidden sm:block">
                <select
                  onChange={handleChange}
                  defaultValue=""
                  aria-label="Select language"
                  className="
                    h-9
                    cursor-pointer
                    appearance-none
                    rounded-md
                    border
                    border-white/20
                    bg-black/70
                    px-3
                    pr-8
                    text-sm
                    text-white
                    outline-none
                    backdrop-blur-md
                    transition
                    duration-200
                    hover:border-white/50
                    focus:border-white
                  "
                >
                  <option value="" disabled>
                    Language
                  </option>

                  {SupportedLang.map((data) => (
                    <option
                      key={data.identifier}
                      value={data.identifier}
                      className="bg-black text-white"
                    >
                      {data.LanguageName}
                    </option>
                  ))}
                </select>

                <span
                  className="
                    pointer-events-none
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    text-gray-400
                  "
                >
                  ▼
                </span>
              </div>
            )}

            {/* GPT Search */}
            <button
              type="button"
              onClick={handleGPT}
              aria-label={showGPT ? "Go to home" : "Open GPT search"}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-md
                bg-purple-600
                px-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-purple-900/20
                transition-all
                duration-200
                hover:bg-purple-700
                hover:shadow-purple-900/40
                active:scale-95
                sm:px-4
              "
            >
              <span className="text-base">{showGPT ? "⌂" : "✦"}</span>

              <span className="hidden sm:inline">
                {showGPT ? "Home" : "GPT Search"}
              </span>
            </button>

            {/* User Profile */}
            <div
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-md
                border
                border-white/10
                bg-white/5
                px-2
                backdrop-blur-md
                sm:px-3
              "
            >
              {/* Avatar */}
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${userName} profile`}
                  className="
                    h-7
                    w-7
                    rounded-full
                    object-cover
                    ring-1
                    ring-white/20
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-700
                    text-xs
                    font-bold
                    text-white
                    ring-1
                    ring-white/20
                  "
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Name */}
              <span
                className="
                  hidden
                  max-w-[110px]
                  truncate
                  text-sm
                  font-medium
                  text-white
                  sm:block
                "
                title={userName}
              >
                {userName}
              </span>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              aria-label="Sign out"
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-md
                border
                border-red-500/30
                bg-red-600/90
                px-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-red-900/20
                transition-all
                duration-200
                hover:bg-red-700
                hover:shadow-red-900/40
                active:scale-95
                sm:px-4
              "
            >
              <span>↪</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
