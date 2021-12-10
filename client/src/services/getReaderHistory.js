export async function getReaderHistory(readerId) {
  return await fetch(
    `http://192.168.0.173:8080/reader/readerHistory?reader=${readerId}`
  );
}

export async function getReadersHistories() {
  return await fetch(`http://192.168.0.173:8080/reader/readerHistory`);
}
