"use strict" 
self.onmessage = async function (e) {
	const { bitmap, x, y, w, h, color, outputW, outputH, key } = e.data;

	try {
		const canvas = new OffscreenCanvas(outputW, outputH);
		const ctx = canvas.getContext('2d');

		ctx.drawImage(bitmap, x, y, w, h, 0, 0, outputW, outputH);
		ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, outputW, outputH);

		const result = await createImageBitmap(canvas);
		self.postMessage({ key, result }, [result]);
	} catch (err) {
		// İstersen error logla
	}
};