// Función para agregar dinámicamente otra selección de pizza
function addPizza() {
  const pizzaSelection = document.getElementById('pizza-selection');
  const nextIndex = pizzaSelection.querySelectorAll('.pizza-item').length + 1;

  const newPizzaItem = document.createElement('div');
  newPizzaItem.classList.add('pizza-item');

  newPizzaItem.innerHTML = `
    <label for="pizza-type-${nextIndex}">Tipo de Pizza:</label>
    <select id="pizza-type-${nextIndex}" name="pizza-type[]" required>
      <option value="">Seleccione...</option>
      <option value="capricciosa">Capricciosa</option>
      <option value="napoli">Napoli</option>
      <option value="quattro-stagioni">Quattro Stagioni</option>
      <option value="marguerita">Marguerita</option>
    </select>
    <label for="pizza-quantity-${nextIndex}">Cantidad:</label>
    <input type="number" id="pizza-quantity-${nextIndex}" name="pizza-quantity[]" min="1" required />
    <div class="toppings-group">
      <label>
        <input type="checkbox" name="toppings-${nextIndex}[]" value="aceituna">
        Aceituna
      </label>
      <label>
        <input type="checkbox" name="toppings-${nextIndex}[]" value="champinones">
        Champiñones
      </label>
      <label>
        <input type="checkbox" name="toppings-${nextIndex}[]" value="pepperoni">
        Pepperoni
      </label>
      <label>
        <input type="checkbox" name="toppings-${nextIndex}[]" value="carne-res">
        Carne de Res
      </label>
    </div>
  `;

  pizzaSelection.appendChild(newPizzaItem);
}

// Capturar el formulario cuando se envíe
const form = document.getElementById('delivery-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
  // Capturar los datos del formulario
  const formData = new FormData(form);
  
  // Procesar los datos como desees
  let summary = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead style="background-color: #007bff; color: white;">
        <tr>
          <th style="padding: 10px;">Tipo de Pizza</th>
          <th style="padding: 10px;">Cantidad</th>
          <th style="padding: 10px;">Toppings</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Iterar sobre los datos capturados
  formData.getAll('pizza-type[]').forEach((pizzaType, index) => {
    const quantity = formData.getAll('pizza-quantity[]')[index];
    const toppings = formData.getAll(`toppings-${index + 1}[]`).join(', ');

    summary += `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px; text-align: center;">${pizzaType}</td>
        <td style="padding: 10px; text-align: center;">${quantity}</td>
        <td style="padding: 10px;">${toppings}</td>
      </tr>
    `;
  });
  
  summary += `
      </tbody>
    </table>
  `;

  // Mostrar el resumen del pedido
  const orderSummary = document.getElementById('order-summary');
  orderSummary.innerHTML = `
    <h2>Resumen del Pedido</h2>
    <div id="summary-content">${summary}</div>
  `;
  orderSummary.classList.remove('hidden');
});
