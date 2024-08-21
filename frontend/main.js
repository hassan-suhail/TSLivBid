function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User created successfully') {
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    });
}

function getAuctions() {
    fetch('/api/auctions')
        .then(response => response.json())
        .then(data => {
            const auctionList = document.getElementById('auctionList');
            auctionList.innerHTML = '';
            data.forEach(auction => {
                const listItem = document.createElement('li');
                listItem.textContent = `${auction.item} - $${auction.highestBid} (Highest Bidder: ${auction.highestBidder}) [Created by: ${auction.author}]`;
                auctionList.appendChild(listItem);
            });
        });
}

function createAuction() {
    const item = document.getElementById('item').value;
    const startingBid = document.getElementById('startingBid').value;
    const user = JSON.parse(localStorage.getItem('user'));

    fetch('/api/auctions/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item, startingBid, author: user.username }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Auction created successfully') {
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    });
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Call getAuctions if on the auction list page
if (window.location.pathname === '/index.html') {
    getAuctions();
}
