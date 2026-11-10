const form = document.querySelector('#enquiry');

if (form) {
  const equipment = form.elements.namedItem('equipment');
  const product = new URLSearchParams(window.location.search).get('product');
  if (Array.from(equipment.options).some(option => option.value === product)) {
    equipment.value = product;
  }
  form.querySelector('button').hidden = false;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const brief = [
      'BCE equipment enquiry brief',
      '',
      'Equipment: ' + fields.get('equipment'),
      'Company or organisation: ' + fields.get('company'),
      'Quantity: ' + fields.get('quantity'),
      'Delivery city: ' + fields.get('city'),
      '',
      'Project requirements',
      fields.get('requirements')
    ].join('\n');
    const file = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BCE-equipment-enquiry.txt';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    document.querySelector('#form-status').textContent = 'Your enquiry brief is ready to download.';
  });
}
