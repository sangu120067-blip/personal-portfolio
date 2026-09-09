/* ================================================= */
/* MOBILE NAVIGATION                                  */
/* ================================================= */

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });


    document
        .querySelectorAll("#navMenu a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

            });

        });

}



/* ================================================= */
/* ACTIVE NAVIGATION                                  */
/* ================================================= */

const navLinks =
    document.querySelectorAll("#navMenu a");


const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 120;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* ================================================= */
/* CONTACT FORM                                      */
/* ================================================= */

const contactForm =
    document.getElementById("contactForm");

const submitBtn =
    document.getElementById("submitBtn");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* Validate */

            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please fill in all the fields.";

                formMessage.style.color =
                    "#dc2626";

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.style.color =
                    "#dc2626";

                return;

            }


            /* Loading */

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                "Sending...";


            formMessage.textContent = "";


            try {

                /*
                 * Backend API
                 *
                 * Your Node.js backend
                 * will run on port 5000.
                 */

                const response =
                    await fetch(
                        "http://localhost:5000/api/contact",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                message: message

                            })

                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    formMessage.textContent =
                        "Message sent successfully! Thank you for contacting me.";

                    formMessage.style.color =
                        "#16a34a";


                    contactForm.reset();

                }

                else {

                    formMessage.textContent =
                        data.message ||
                        "Something went wrong.";

                    formMessage.style.color =
                        "#dc2626";

                }

            }


            catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                formMessage.textContent =
                    "Unable to connect to the server.";

                formMessage.style.color =
                    "#dc2626";

            }


            /* Reset button */

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                'Send Message <span>→</span>';

        }
    );

}