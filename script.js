        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');
            
            // Limpiar mensajes anteriores
            messageDiv.textContent = '';
            messageDiv.className = '';
            
            try {
                // Cargar el archivo JSON de usuarios
                const response = await fetch('users.json');
                if (!response.ok) throw new Error('Error al cargar usuarios');
                
                const data = await response.json();
                const user = data.users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    // Acceso válido
                    messageDiv.textContent = '✓ Acceso concedido. Redirigiendo...';
                    messageDiv.className = 'success';
                    
                    // Simular redirección (en un proyecto real cambiaría de página)
                    setTimeout(() => {
                        console.log('Usuario autenticado:', user.username);
                        // window.location.href = 'dashboard.html';
                    }, 1500);

                    // Método 1: Intentar con replace (no permite volver atrás)
                    try {
                        window.location.replace('https://951001-kma.github.io/NCR23730-H/');
                        return;
                    } catch (error) {
                        console.log('Método replace falló, intentando con href');
                    }

                    // Método 2: Usar href si replace falla
                    setTimeout(() => {
                        window.location.href = 'https://951001-kma.github.io/NCR23730-H/';
                    }, 1000);

                    // Método 3: Enlace de respaldo (para navegadores muy restrictivos)
                    setTimeout(() => {
                        const backupLink = document.createElement('a');
                        backupLink.href = 'https://951001-kma.github.io/NCR23730-H/';
                        backupLink.target = '_blank';
                        backupLink.rel = 'noopener noreferrer';
                        backupLink.click();
                    }, 1500);


                } else {
                    // Credenciales incorrectas
                    messageDiv.textContent = '✗ Usuario o contraseña incorrectos';
                    messageDiv.className = 'error';
                }
            } catch (error) {
                console.error('Error:', error);
                messageDiv.textContent = '⚠ Error del sistema. Intente nuevamente.';
                messageDiv.className = 'error';
            }
        });