const validateForm = (rating) => {
  const errors = {};
  if (rating.number > 5) {
    errors.number = "La calificacion no puede ser mayor a 5.";
  }
  if (rating.number < 0) {
    errors.number = "La calificacion no puede ser menor a 0.";
  }
  if (rating.review.length < 5){
    errors.review = "Debe contener por lo menos 5 caracteres."
  }
  if (/^\d+$/.test(rating.review)) {
    errors.review = "No puede contener solo números.";
  }

  return errors;
};

export default validateForm;
