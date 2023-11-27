const axios = require('axios');

const databricksToken = 'YOUR_DATABRICKS_ACCESS_TOKEN';
const notebookPath = '/path/to/your/notebook'; // Specify your notebook path

async function callDatabricksNotebook() {
  try {
    const response = await axios.post(`https://<YOUR-DATABRICKS-WORKSPACE-URL>/api/2.0/workspace/export`, {
      path: notebookPath,
      format: 'SOURCE'
    }, {
      headers: {
        'Authorization': `Bearer ${databricksToken}`,
        'Content-Type': 'application/json'
      }
    });

    const notebookContent = response.data.content; // Extract notebook content
    console.log('Notebook Content:', notebookContent);

    // Assuming you got the content of the notebook, you can make other API requests or handle the content accordingly

  } catch (error) {
    console.error('Error executing notebook:', error.response ? error.response.data.error_message : error.message);
  }
}

callDatabricksNotebook();
