/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

//
// See README for overview
//

'use strict';

//
// Fetch the PDF document from the URL using promises
//
PDFJS.getDocument('helloworld.pdf').then(function(pdf) {
  // Using promise to fetch the page
  pdf.getPage(1).then(function(page) {
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    //
    // Prepare canvas using PDF page dimensions
    //
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    //
    // Render PDF page into canvas context
    //
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext).then(function() {
        var imageData = context.getImageData(0, 0, viewport.width, viewport.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          // red
          data[i] = 255 - data[i];
          // green
          data[i + 1] = 255 - data[i + 1];
          // blue
          data[i + 2] = 255 - data[i + 2];
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
      },
      function() {
        console.log("ERROR");
      });
  });
});

