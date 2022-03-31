dev:
	nodemon \
	-w render.njk \
	-w style.css \
	-w script.js \
	--exec 'node render.js > public/index.html'
