import React from 'react';
import { getAppointments, getStock } from '../utils/storage';

export default function StoragePage() {
  const appts = getAppointments();
  const stock = getStock();

  return (
    <div className="card storage-card">
      <h3>Stored Data</h3>
      <div className="storage-grid">
        <div>
          <h4>Appointments</h4>
          {appts.length === 0 ? <p className="muted">No appointments saved.</p> : (
            <pre className="monospace">{JSON.stringify(appts, null, 2)}</pre>
          )}
        </div>
        <div>
          <h4>Stock</h4>
          {stock.length === 0 ? <p className="muted">No stock saved.</p> : (
            <pre className="monospace">{JSON.stringify(stock, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
