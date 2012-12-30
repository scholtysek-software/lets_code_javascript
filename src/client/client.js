// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global dump, Raphael, $, wwp:true*/

wwp = {};

(function() {
	"use strict";

		var paper;

		wwp.initializeDrawingArea = function(drawingAreaElement) {
			var start = null;
			var isDragging = false;

			paper = new Raphael(drawingAreaElement);

			$(document).mousedown(function(event) {
				isDragging = true;
				start = relativeOffset(drawingArea, event.pageX, event.pageY);
			});
			$(document).mouseup(function(event) {
				isDragging = false;
			});

			var drawingArea = $(drawingAreaElement);
			drawingArea.mousemove(function(event) {
				var end = relativeOffset(drawingArea, event.pageX, event.pageY);
				if (start !== null && isDragging) wwp.drawLine(start.x, start.y, end.x, end.y);
				start = end;
			});

//			var prevX = null;
//			var prevY = null;
//
//			var jqArea = $(drawingAreaElement);
//
//			var isDragging = false;
//
//
//			// TODO in test: if mouse clicked when outside of element, or let go outside of element,
//			// then the 'isDragging' state could get stuck
//			$(document).mousedown(function(event) {
//				isDragging = true;
//			});
//			$(document).mouseup(function(event) {
//				isDragging = false;
//			});
//
//			jqArea.mousemove(function(event) {
//				// TODO in test: account for padding, border, margin (manual tests too)
//				var divPageX = jqArea.offset().left;
//				var divPageY = jqArea.offset().top;
//
//				var relativeX = event.pageX - divPageX;
//				var relativeY = event.pageY - divPageY;
//
//				if (prevX !== null && isDragging) wwp.drawLine(prevX, prevY, relativeX, relativeY);
//				prevX = relativeX;
//				prevY = relativeY;
//			});
			return paper;
		};

		wwp.drawLine = function(startX, startY, endX, endY) {
			paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
		};

	function relativeOffset(element, absoluteX, absoluteY) {
		var pageOffset = element.offset();

		return {
			x: absoluteX - pageOffset.left,
			y: absoluteY - pageOffset.top
		};
	}

}());