function createTable(header, data, rowClick = function () {}) {
  let div = document.createElement('div');
  let table = document.createElement('table');
  table.classList.add('modern-table');

  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  let thr = document.createElement('tr');

  // Add header columns
  for (const column of header) {
    const th = document.createElement('th');
    th.textContent = column.title || 'Blank';
    th.classList.add('modern-table-header');
    thr.appendChild(th);
  }
  thead.appendChild(thr);

  let selected_rows = {
    prev: null,
  };

  // Add table rows
  data.forEach((entry) => {
    let tbr = document.createElement('tr');
    tbr.classList.add('modern-table-row');

    if (entry.id != null) {
      tbr.dataset.id = entry.id;
    }

    for (let column of header) {
      let key = column.key;
      const td = document.createElement('td');
      td.classList.add('modern-table-cell');

      if (typeof entry[key] === 'object' && entry[key] != null) {
        tbr.dataset[key] = JSON.stringify(entry[key]);
      } else {
        tbr.dataset[key] = entry[key];
      }

      td.textContent = entry[key] || '-';
      tbr.appendChild(td);
    }

    // Add row click handling
    tbr.addEventListener('click', async function (event) {
      if (selected_rows.prev) {
        selected_rows.prev.classList.remove('modern-table-row-selected');
      }

      selected_rows.prev = this;
      this.classList.add('modern-table-row-selected');

      await rowClick.bind(this)(event, this.dataset);
    });

    tbody.appendChild(tbr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  // Container styles for scrolling
  div.style.maxHeight = '60%';
  div.style.maxWidth = '1200px';
  div.style.overflow = 'auto';
  div.appendChild(table);

  return div;
}

export default createTable;
