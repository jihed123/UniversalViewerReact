import React, { useEffect, useRef } from "react";
import "universalviewer/dist/uv.css";
import "universalviewer/dist/esm/index.css";

import { init } from "universalviewer";
const Uvsimple = () => {
	const uvRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type and initialize to null
	useEffect(() => {
		const initViewer = async () => {
			const data = {
				manifest: "https://wellcomelibrary.org/iiif/b18035723/manifest",
				embedded: true,
			};
			init("uv", data);
		};

		initViewer();
	}, []);

	return (
		<div
			className="uv"
			id="uv"
			ref={uvRef}></div>
	);
};

export default Uvsimple;
