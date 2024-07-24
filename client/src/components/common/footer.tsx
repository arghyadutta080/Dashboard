export const Footer = () => {
    return (
      <div className="relative mt-16 bg-green-300">
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-primary"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
  fill="#86efac"
  d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
/>

        </svg>
        <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
            <div className="md:max-w-md lg:col-span-2">
              <a
                href="/"
                aria-label="Go home"
                title="Next"
                className="inline-flex items-center"
              >
                           </a>
              <div className="mt-4 lg:max-w-sm">
                
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
              <div>
                <p className="font-semibold tracking-wide text-primary">
                  Category
                </p>
                
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/privacyPolicy"
                      className="transition-colors duration-300 text-gray-100 hover:text-primary"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-gray-100 hover:text-primary"
                    >
                      Payment Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-gray-100 hover:text-primary"
                    >
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms-of-service"
                      className="transition-colors duration-300 text-gray-100 hover:text-primary"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/legal-disclaimer"
                      className="transition-colors duration-300 text-gray-100 hover:text-primary"
                    >
                      Legal Disclaimer
                    </a>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    );
  };
  