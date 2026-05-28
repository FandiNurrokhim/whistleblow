<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>NOT FOUND</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/Logo/favicon_io/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/Logo/favicon_io/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/Logo/favicon_io/favicon-16x16.png') }}">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <style>
        body { font-family: 'Figtree', sans-serif; background: linear-gradient(to right, #7c3aed, #ec4899, #ef4444); color: #fff; min-height: 100vh; margin: 0; }
        .center { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .btn { margin-top: 2rem; display: inline-block; border-radius: 0.5rem; background: rgba(255,255,255,0.2); padding: 1rem 2rem; font-weight: 600; color: #fff; text-decoration: none; transition: background 0.2s; }
        .btn:hover { background: rgba(255,255,255,0.4); }
        footer { position: absolute; bottom: 1.5rem; width: 100%; text-align: center; color: rgba(255,255,255,0.7); font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="center">
        <div style="max-width: 32rem; text-align: center;">
            <h1 style="font-size:6rem; font-weight:800; text-shadow: 0 2px 8px #0002;">404</h1>
            <h2 style="font-size:2rem; font-weight:600; margin-top:1rem;">Not Found</h2>
            <p style="margin-top:1.5rem; font-size:1.1rem;">Sorry, the page you are looking for could not be found.</p>
            <a href="{{ url()->previous() }}" class="btn">Go Back</a>
        </div>
        <footer>
            &copy; {{ date('Y') }} Your Company
        </footer>
    </div>
</body>
</html>