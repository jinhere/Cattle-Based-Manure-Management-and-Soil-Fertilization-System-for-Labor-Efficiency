//Device.js
//This is the class for saving socket data before stacking them in database
class Device {
  constructor(pdu, devEui, txttime) {
    this.pdu = pdu;
    this.devEui = devEui;
    this.txtime = txttime;
  }

  //parse time and convert into 'year-month-day time' format to save into table
  //Senet sends time with {12-13-2023T23:59:59} format-> Sever change it to {2023-12-11 23:59:59}
  parseTime() {
    const date = new Date(this.txtime);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'numeric' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('default', {hour12: false});
    return `${year}-${month}-${day} ${time}`;
  }

  addPdu(pdu) {
    this.pdu.push(pdu);
  }

  getDevEui() {
    return this.devEui;
  }

  getPDU() {
    return this.pdu;
  }

  //PDU consists of NPK value, 16 length
  //Extract Nitrogen value from PDU
  getNitrogen() {
    return parseInt(this.pdu.substring(0, 4), 16); 
  }

  //Extract Phosphorous value from PDU
  getPhosphorous() {
    return parseInt(this.pdu.substring(4, 8), 16);
  }

  //Extract Potassium value from PDU
  getPotassium() {
    return parseInt(this.pdu.substring(8, 12), 16); 
  }
}

module.exports = Device;

