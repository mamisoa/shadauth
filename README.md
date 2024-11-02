# Boiler plate for authentification with NextJS 15, authjs and shadcn

## Getting Started

### Setup env files

Setup .env and .env.local

You need an email with SMTP access and Google credentials.

### Docker database

#### Change permissions for PGadmin 4

```bash
sudo chown -R 5050:5050 pgadmin_data
```

### next.config.ts

Add google domain for user avatar.

```javascript
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "/**",
				search: "",
			},
		],
	},
};
```
