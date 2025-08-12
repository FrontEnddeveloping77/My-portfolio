document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  const navbar = document.getElementById("nav");
  const heroSection = document.getElementById("hero");
  const heroContent = document.querySelector(".hero-content");
  const navLinks = document.querySelectorAll(".main-nav a");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".main-nav");
  const instagramField = document.getElementById("instagramField");
  const platformSelect = document.getElementById("platform");
  const contactForm = document.getElementById("contactForm");
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("popupContent");
  const popupTitle = document.getElementById("popupTitle");
  const popupMessage = document.getElementById("popupMessage");
  const closePopupBtn = document.getElementById("closePopup");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - navbar.offsetHeight,
        behavior: "smooth",
      });
    });
  });

  const revealElements = document.querySelectorAll(".reveal-element");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));

  window.addEventListener("load", () => {
    setTimeout(() => {
      heroContent.classList.add("is-visible");
    }, 100);
  });

  platformSelect.addEventListener("change", () => {
    if (platformSelect.value === "instagram") {
      instagramField.style.display = "block";
    } else {
      instagramField.style.display = "none";
    }
  });

  const showPopup = (title, message, isSuccess = true) => {
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popupContent.className = "popup-content";
    if (isSuccess) {
      popupContent.classList.add("success");
    } else {
      popupContent.classList.add("error");
    }
    popupContainer.classList.add("show");
  };

  closePopupBtn.addEventListener("click", () => {
    popupContainer.classList.remove("show");
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formInputs = contactForm.querySelectorAll("input, textarea, select");
    formInputs.forEach((input) => input.classList.remove("invalid"));

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const platform = document.getElementById("platform");
    const instagramNickname = document.getElementById("instagramNickname");

    let isValid = true;
    if (!name.value) {
      name.classList.add("invalid");
      showPopup("Xato", "Iltimos, Ism maydonini to'ldiring.", false);
      isValid = false;
      return;
    }
    if (!email.value) {
      email.classList.add("invalid");
      showPopup("Xato", "Iltimos, Email maydonini to'ldiring.", false);
      isValid = false;
      return;
    }
    if (platform.value === "instagram" && !instagramNickname.value) {
      instagramNickname.classList.add("invalid");
      showPopup("Xato", "Iltimos, Instagram nicknamingizni kiriting.", false);
      isValid = false;
      return;
    }
    if (!message.value) {
      message.classList.add("invalid");
      showPopup("Xato", "Iltimos, Xabar maydonini to'ldiring.", false);
      isValid = false;
      return;
    }

    if (!isValid) return;

    const nameValue = name.value;
    const emailValue = email.value;
    const phoneValue = document.getElementById("phone").value;
    const platformValue = platform.value;
    const instagramNicknameValue = instagramNickname.value;
    const messageValue = message.value;

    let telegramMessage =
      `Yangi xabar!\n\n` +
      `Ism: ${nameValue}\n` +
      `Email: ${emailValue}\n` +
      `Telefon: ${phoneValue || "Kiritilmagan"}\n` +
      `Tanlangan tarmoq: ${platformValue}\n`;

    if (platformValue === "instagram") {
      telegramMessage += `Instagram Nickname: ${instagramNicknameValue}\n`;
    }
    telegramMessage += `\nXabar:\n${messageValue}`;

    const TELEGRAM_BOT_TOKEN = "8238860417:AAERcbHXD8aUixfsgkOK44heOJ6yboFoNGY";
    const TELEGRAM_CHAT_ID = "5977830644";

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const params = {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        showPopup("Muvaffaqiyat", "Xabar muvaffaqiyatli yuborildi!", true);
        contactForm.reset();
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        showPopup(
          "Xato",
          "Xabarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
          false
        );
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert(
        "Tarmoq xatosi",
        "Tarmoq bilan bog'lanishda muammo yuz berdi. Internetingizni tekshiring.",
        false
      );
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Formning sahifani yangilashini to‘xtatadi

  const formData = new FormData(this);

  fetch("https://example.com/send", {
    // server URL
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      alert("Xabaringiz yuborildi!");
      this.reset();
    })
    .catch((err) => {
      alert("Xabar yuborishda xatolik yuz berdi!");
      console.error(err);
    });
});
