document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const showUsersBtn = document.getElementById('showUsers');
    const addTestUserBtn = document.getElementById('addTestUser');
    const usersListDiv = document.getElementById('usersList');
    
    // Cargar usuarios desde el JSON
    async function loadUsers() {
        try {
            const response = await fetch('users.json');
            if (!response.ok) throw new Error('Error al cargar usuarios');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error al cargar los usuarios', 'error');
            return { users: [] };
        }
    }
    
    // Mostrar mensajes
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);
    }
    
    // Manejar el login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            showMessage('Por favor completa todos los campos', 'error');
            return;
        }
        
        try {
            const data = await loadUsers();
            const user = data.users.find(u => u.username === username && u.password === password);
            
            if (user) {
                showMessage(`¡Bienvenido ${user.username}! (Redirigiendo...)`, 'success');
                // Simular redirección (en un proyecto real cambiaría la página)
                setTimeout(() => {
                    console.log('Redirigiendo al usuario:', user);
                }, 1500);
            } else {
                showMessage('Usuario o contraseña incorrectos', 'error');
            }
        } catch (error) {
            showMessage('Error en el sistema. Intenta más tarde.', 'error');
            console.error('Login error:', error);
        }
    });
    
    // Funciones para pruebas (solo desarrollo)
    showUsersBtn.addEventListener('click', async function() {
        const data = await loadUsers();
        usersListDiv.innerHTML = `<pre>${JSON.stringify(data.users, null, 2)}</pre>`;
    });
    
    addTestUserBtn.addEventListener('click', async function() {
        try {
            // En un proyecto real, esto sería una llamada a un backend
            const data = await loadUsers();
            const newId = data.users.length > 0 ? 
                Math.max(...data.users.map(u => u.id)) + 1 : 1;
            
            const newUser = {
                id: newId,
                username: `test${newId}`,
                password: `test${newId}`,
                email: `test${newId}@example.com`
            };
            
            // Nota: Esto no guarda realmente en el archivo JSON (solo en memoria)
            data.users.push(newUser);
            usersListDiv.innerHTML = `<pre>Usuario añadido (simulado):\n${JSON.stringify(newUser, null, 2)}\n\nPara persistencia real necesitarías un backend.</pre>`;
            
            showMessage(`Usuario de prueba ${newUser.username} creado (en memoria)`, 'success');
        } catch (error) {
            console.error('Error añadiendo usuario:', error);
            showMessage('Error al añadir usuario', 'error');
        }
    });
    
    // Mensaje inicial para pruebas
    console.log('Sistema de login cargado. Usa Live Server para probar.');
});