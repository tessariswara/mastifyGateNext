export const fetchData = async () => {
  try {
    const response = await fetch('http://178.128.107.238:8000/apiv1/control/allcontrollers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          set_device_id: false,
          device_id: "",
          set_device_type: false,
          device_type: "",
          set_name: false,
          name: "",
          set_manufacture: false,
          manufacture: "",
          set_ip_address: false,
          ip_address: ""
        },
        limit: 10,
        page: 1,
        order: "created_at",
        sort: "DESC"
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
