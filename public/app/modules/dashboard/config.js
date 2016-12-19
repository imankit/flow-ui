export default {
	commonEnd: {
				endpoint: "Dot",
				paintStyle: { fillStyle: "blue", radius: 7 },
				maxConnections: 1,
				dropOptions: { hoverClass: "hover", activeClass: "active" },
				isTarget: true,
				overlays: [["Label", { location: [0.5, -0.5], label: "", cssClass: "endpointTargetLabel" }]]
			},
	commonSource: {
		endpoint: "Dot",
		paintStyle: {
		    strokeStyle: "green", fillStyle: "green", radius: 5, lineWidth: 1
		},
		isSource: true,
		maxConnections: 1,
		connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
		dragOptions: {},
		overlays: [["Label", { location: [0.5, 1.5], label: "", cssClass: "endpointSourceLabel", }]]
	}
}