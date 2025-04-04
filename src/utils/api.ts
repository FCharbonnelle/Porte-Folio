// Utilitaires pour les requêtes API
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  
  return await response.json();
}

export async function postData<T>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  
  return await response.json();
}

export async function updateData<T>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  
  return await response.json();
} 