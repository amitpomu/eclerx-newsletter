const messageElement = document.getElementById("eclerx-info-message");
const submitForm = async (getDetails) => {
  const { safeName, firstName, surName, email } = getDetails;
  try {
    const rootUrl = window.location.origin;
    const response = await fetch(eclerx_api_data.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": eclerx_api_data.nonce,
        credentials: "same-origin",
      },
      body: JSON.stringify({ safeName, firstName, surName, email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error");
    console.log(data);

    messageElement.textContent = data.message;
    messageElement.setAttribute('data-status', 'success');
  } catch (err) {
    messageElement.textContent = err.message;
    messageElement.setAttribute('data-status', 'error');
  }
};
