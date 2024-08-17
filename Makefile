dev:
	docker run --rm -it \
		-v $(PWD):/work:Z \
		--network host \
		yi-dev
	# wyfio/nodejs:20

server:
	nodemon \
		-w render.njk \
		-w style.css \
		-w script.js \
		--exec 'node render.js > public/index.html'

deploy:
	firebase deploy --only hosting

dev-img:
	docker build -t yi-dev -f Dockerfile
