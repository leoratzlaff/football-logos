const http = require('http');

// Start testing immediately with the API running (or assume it's already running)
function testEndpoint(port, path, callback) {
  const options = {
    hostname: 'localhost',
    port: port,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      callback({
        status: res.statusCode,
        contentType: res.headers['content-type'],
        data: data,
        success: res.statusCode === 200
      });
    });
  });

  req.on('error', (error) => {
    callback({
      error: error.message,
      success: false
    });
  });

  req.end();
}

console.log('🧪 Testing Football Badges API\n');

// Test with port 3000 (or whichever port is running)
const testPort = 3000;
const tests = [
  { path: '/', name: 'Health Check' },
  { path: '/api/leagues', name: 'List Leagues' },
  { path: '/api/leagues/england-premier-league/teams', name: 'List Teams' },
  { path: '/api/england-premier-league/arsenal-fc', name: 'Get Arsenal Logo' }
];

let completed = 0;

tests.forEach((test, index) => {
  setTimeout(() => {
    testEndpoint(testPort, test.path, (result) => {
      if (result.success) {
        console.log(`✅ ${test.name}`);
        console.log(`   Path: ${test.path}`);
        if (test.path === '/') {
          const json = JSON.parse(result.data);
          console.log(`   Status: ${json.status}`);
        } else if (test.path.includes('/teams')) {
          const json = JSON.parse(result.data);
          console.log(`   Teams: ${json.count}`);
        } else if (test.path.includes('/api/')) {
          console.log(`   Content-Type: ${result.contentType}`);
          console.log(`   Size: ${result.data.length} bytes`);
        }
      } else {
        console.log(`❌ ${test.name}`);
        console.log(`   Path: ${test.path}`);
        console.log(`   Error: ${result.error || `Status ${result.status}`}`);
      }
      console.log();
      
      completed++;
      if (completed === tests.length) {
        console.log('='.repeat(50));
        console.log('Testing complete!');
      }
    });
  }, index * 300);
});
