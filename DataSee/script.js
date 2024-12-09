// Function to display data
function displayData(data) {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = ''; // Clear previous data

  if (data.length === 0) {
    dataContainer.innerHTML = `<p>No data found for the given filters.</p>`;
    return;
  }

  data.forEach((student) => {
    const item = document.createElement('div');
    item.classList.add('data-item');

    item.innerHTML = `
      <img src="${student.img}" alt="Student Image">
      <div class="info">
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>College Name:</strong> ${student.college_name}</p>
        <p><strong>Father:</strong> ${student.father_name}</p>
        <p><strong>Mother:</strong> ${student.mother_name}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <p><strong>Roll NoE:</strong> ${student.roll_numberE}</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
        <p><strong>Address:</strong> ${student.address}</p>
        <p><strong>Mobile:</strong> ${student.mobile}</p>
        <p><strong>DOB:</strong> ${student.dob}</p>
        <p><strong>Registration No:</strong> ${student.registration_number}</p>
        <p><strong>Category:</strong> ${student.category}</p>
        <p><strong>Class Roll No:</strong> ${student.roll_numberC}</p>
      </div>
    `;

    dataContainer.appendChild(item);
  });
}

// Function to fetch and filter data
async function filterData() {
  const name = document.getElementById('name').value.toLowerCase();
  const college = document.querySelector('select:nth-of-type(1)').value;
  const course = document.querySelector('select:nth-of-type(2)').value;
  const session = document.querySelector('select:nth-of-type(3)').value;

  // API endpoint
  const apiEndpoint = 'https://data-bk.onrender.com/student/find-data'; // Replace with your API URL

  try {
    // Fetch data from API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || null,
        college_name: college || null,
        course: course || null,
        semester: session || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the response as JSON
    console.log(data.data);
    
    // Filter and display dat
    displayData(data?.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}

// Event listener for the "Find Data" button
document.getElementById('findButton').addEventListener('click', filterData);

// Initialize the page with all data (optional - can fetch all data initially)
// window.onload = async function () {
//   try {
//     const response = await fetch('https://example.com/api/students'); // Replace with your API endpoint
//     const data = await response.json();
//     displayData(data);
//   } catch (error) {
//     console.error('Error fetching initial data:', error);
//   }
// };
