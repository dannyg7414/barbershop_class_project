"use strict";

const estimateForm = document.querySelector("#estimate-form");

if (estimateForm) {
  const serviceSelect = document.querySelector("#service");
  const errorMessage = document.querySelector("#service-error");
  const resultMessage = document.querySelector("#estimate-result");

  const services = {
    "mens-haircut": {
      name: "Men’s Haircut",
      price: 25
    },
    "kids-haircut": {
      name: "Kids Haircut (ages 6–17)",
      price: 15
    },
    "taper": {
      name: "Taper",
      price: 15
    },
    "facial-lineup": {
      name: "Facial Lineup",
      price: 5
    },
    "beard-trim": {
      name: "Beard Trim",
      price: 5
    }
  };

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  function validateService() {
    const selectedService = services[serviceSelect.value];

    if (!selectedService) {
      serviceSelect.setAttribute("aria-invalid", "true");
      serviceSelect.setCustomValidity("Please choose a service.");
      errorMessage.textContent = "Please choose a service.";
      return false;
    }

    serviceSelect.removeAttribute("aria-invalid");
    serviceSelect.setCustomValidity("");
    errorMessage.textContent = "";
    return true;
  }

  serviceSelect.addEventListener("change", function () {
    resultMessage.textContent = "";
    validateService();
  });

  serviceSelect.addEventListener("blur", validateService);

  serviceSelect.addEventListener("invalid", function () {
    validateService();
  });

  estimateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateService()) {
      serviceSelect.focus();
      return;
    }

    const selectedService = services[serviceSelect.value];

    resultMessage.textContent =
      "Price calculated: " +
      selectedService.name +
      " — " +
      currency.format(selectedService.price) +
      ". This is a price estimate only; no appointment has been booked.";
  });
}
