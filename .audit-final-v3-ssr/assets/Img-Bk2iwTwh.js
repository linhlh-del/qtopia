import { useCallback } from "react";
import { jsx } from "react/jsx-runtime";
// src/data/image-sizes.json
var image_sizes_default = {
	"/images/brand/logo-horizontal-full-color.png": [900, 259],
	"/images/brand/logo-horizontal-white.png": [900, 259],
	"/images/brand/logo-vertical-mono-white.png": [900, 851],
	"/images/brand/logo-vertical-white.png": [900, 851],
	"/images/layouts/ama-studio-q5-q6.webp": [1600, 1066],
	"/images/layouts/ama-studio-q7.webp": [1600, 1066],
	"/images/layouts/aria-3pn-q7.webp": [1600, 1066],
	"/images/layouts/mira-1pn-q5-q6.webp": [1600, 1066],
	"/images/layouts/mira-1pn-q7.webp": [1600, 1066],
	"/images/layouts/vita-2pn-q5-q6.webp": [1600, 1066],
	"/images/layouts/vita-2pn-q7.webp": [1600, 1066],
	"/images/renders/aqua-funny-park-night.webp": [2e3, 1116],
	"/images/renders/aqua-funny-park.webp": [2e3, 1125],
	"/images/renders/birdview.webp": [2400, 1349],
	"/images/renders/cong-chao.webp": [2e3, 1125],
	"/images/renders/dj-ocean.webp": [2e3, 2678],
	"/images/renders/interior-studio-2.webp": [2e3, 888],
	"/images/renders/interior-studio.webp": [2e3, 796],
	"/images/renders/oasis-pool.webp": [2e3, 1125],
	"/images/renders/ocean-galaxy-2.webp": [2e3, 1125],
	"/images/renders/ocean-galaxy-3.webp": [2e3, 1125],
	"/images/renders/ocean-galaxy.webp": [2e3, 1116],
	"/images/renders/roof-q5.webp": [2e3, 1124],
	"/images/renders/roof-q6.webp": [2e3, 1124],
	"/images/renders/tien-ich-1.webp": [2e3, 1124],
	"/images/renders/tien-ich-2.webp": [2e3, 1116],
	"/images/renders/tien-ich-3.webp": [2e3, 1125],
	"/images/renders/tien-ich-5.webp": [2e3, 1125],
	"/images/renders/view-from-sea.webp": [2400, 1350],
	"/images/location/mascot-octopus.webp": [1537, 1023],
	"/images/location/paraglider.webp": [448, 496],
	"/images/location/crystal.webp": [427, 402],
	"/images/location/orb.webp": [276, 269],
	"/images/og-qtopia-mat-bang.webp": [1200, 630],
	"/images/og-qtopia-tien-ich.webp": [1200, 630],
	"/images/og-qtopia-trang-chu.webp": [1200, 630],
	"/images/og-qtopia-vi-tri.webp": [1200, 630],
	"/images/mat-bangq5-q6.webp": [1279, 404],
	"/images/position-map.webp": [1456, 683]
};
// src/data/responsive-images.json
var responsive_images_default = {
	"/images/brand/logo-horizontal-full-color.png": {
		"width": 900,
		"height": 259,
		"variants": [
			{
				"src": "/images/optimized/logo-horizontal-full-color-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/logo-horizontal-full-color-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/logo-horizontal-full-color-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/logo-horizontal-full-color-512.webp",
				"width": 512
			}
		]
	},
	"/images/brand/logo-horizontal-white.png": {
		"width": 900,
		"height": 259,
		"variants": [
			{
				"src": "/images/optimized/logo-horizontal-white-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/logo-horizontal-white-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/logo-horizontal-white-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/logo-horizontal-white-512.webp",
				"width": 512
			}
		]
	},
	"/images/brand/logo-vertical-mono-white.png": {
		"width": 900,
		"height": 851,
		"variants": [
			{
				"src": "/images/optimized/logo-vertical-mono-white-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/logo-vertical-mono-white-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/logo-vertical-mono-white-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/logo-vertical-mono-white-512.webp",
				"width": 512
			}
		]
	},
	"/images/brand/logo-vertical-white.png": {
		"width": 900,
		"height": 851,
		"variants": [
			{
				"src": "/images/optimized/logo-vertical-white-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/logo-vertical-white-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/logo-vertical-white-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/logo-vertical-white-512.webp",
				"width": 512
			}
		]
	},
	"/images/layouts/ama-studio-q5-q6.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/ama-studio-q5-q6-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/ama-studio-q5-q6-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/ama-studio-q5-q6-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/ama-studio-q5-q6-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/ama-studio-q7.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/ama-studio-q7-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/ama-studio-q7-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/ama-studio-q7-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/ama-studio-q7-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/aria-3pn-q7.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/aria-3pn-q7-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/aria-3pn-q7-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/aria-3pn-q7-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/aria-3pn-q7-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/mira-1pn-q5-q6.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/mira-1pn-q5-q6-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/mira-1pn-q5-q6-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/mira-1pn-q5-q6-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/mira-1pn-q5-q6-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/mira-1pn-q7.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/mira-1pn-q7-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/mira-1pn-q7-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/mira-1pn-q7-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/mira-1pn-q7-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/vita-2pn-q5-q6.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/vita-2pn-q5-q6-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/vita-2pn-q5-q6-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/vita-2pn-q5-q6-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/vita-2pn-q5-q6-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/layouts/vita-2pn-q7.webp": {
		"width": 1600,
		"height": 1066,
		"variants": [
			{
				"src": "/images/optimized/vita-2pn-q7-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/vita-2pn-q7-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/vita-2pn-q7-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/vita-2pn-q7-1600.webp",
				"width": 1600
			}
		]
	},
	"/images/renders/aqua-funny-park-night.webp": {
		"width": 2e3,
		"height": 1116,
		"variants": [
			{
				"src": "/images/optimized/aqua-funny-park-night-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/aqua-funny-park-night-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/aqua-funny-park-night-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/aqua-funny-park-night-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/aqua-funny-park.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/aqua-funny-park-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/aqua-funny-park-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/aqua-funny-park-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/aqua-funny-park-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/birdview.webp": {
		"width": 2400,
		"height": 1349,
		"variants": [
			{
				"src": "/images/optimized/birdview-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/birdview-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/birdview-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/birdview-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/cong-chao.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/cong-chao-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/cong-chao-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/cong-chao-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/cong-chao-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/dj-ocean.webp": {
		"width": 2e3,
		"height": 2678,
		"variants": [
			{
				"src": "/images/optimized/dj-ocean-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/dj-ocean-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/dj-ocean-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/dj-ocean-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/interior-studio-2.webp": {
		"width": 2e3,
		"height": 888,
		"variants": [
			{
				"src": "/images/optimized/interior-studio-2-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/interior-studio-2-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/interior-studio-2-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/interior-studio-2-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/interior-studio.webp": {
		"width": 2e3,
		"height": 796,
		"variants": [
			{
				"src": "/images/optimized/interior-studio-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/interior-studio-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/interior-studio-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/interior-studio-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/oasis-pool.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/oasis-pool-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/oasis-pool-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/oasis-pool-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/oasis-pool-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/ocean-galaxy-2.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/ocean-galaxy-2-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/ocean-galaxy-2-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/ocean-galaxy-2-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/ocean-galaxy-2-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/ocean-galaxy-3.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/ocean-galaxy-3-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/ocean-galaxy-3-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/ocean-galaxy-3-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/ocean-galaxy-3-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/ocean-galaxy.webp": {
		"width": 2e3,
		"height": 1116,
		"variants": [
			{
				"src": "/images/optimized/ocean-galaxy-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/ocean-galaxy-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/ocean-galaxy-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/ocean-galaxy-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/roof-q5.webp": {
		"width": 2e3,
		"height": 1124,
		"variants": [
			{
				"src": "/images/optimized/roof-q5-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/roof-q5-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/roof-q5-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/roof-q5-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/roof-q6.webp": {
		"width": 2e3,
		"height": 1124,
		"variants": [
			{
				"src": "/images/optimized/roof-q6-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/roof-q6-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/roof-q6-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/roof-q6-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/tien-ich-1.webp": {
		"width": 2e3,
		"height": 1124,
		"variants": [
			{
				"src": "/images/optimized/tien-ich-1-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/tien-ich-1-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/tien-ich-1-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/tien-ich-1-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/tien-ich-2.webp": {
		"width": 2e3,
		"height": 1116,
		"variants": [
			{
				"src": "/images/optimized/tien-ich-2-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/tien-ich-2-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/tien-ich-2-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/tien-ich-2-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/tien-ich-3.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/tien-ich-3-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/tien-ich-3-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/tien-ich-3-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/tien-ich-3-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/tien-ich-5.webp": {
		"width": 2e3,
		"height": 1125,
		"variants": [
			{
				"src": "/images/optimized/tien-ich-5-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/tien-ich-5-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/tien-ich-5-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/tien-ich-5-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/renders/view-from-sea.webp": {
		"width": 2400,
		"height": 1350,
		"variants": [
			{
				"src": "/images/optimized/view-from-sea-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/view-from-sea-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/view-from-sea-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/view-from-sea-1920.webp",
				"width": 1920
			}
		]
	},
	"/images/location/mascot-octopus.webp": {
		"width": 1537,
		"height": 1023,
		"variants": [
			{
				"src": "/images/optimized/mascot-octopus-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/mascot-octopus-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/mascot-octopus-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/mascot-octopus-512.webp",
				"width": 512
			}
		]
	},
	"/images/location/paraglider.webp": {
		"width": 448,
		"height": 496,
		"variants": [
			{
				"src": "/images/optimized/paraglider-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/paraglider-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/paraglider-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/paraglider-448.webp",
				"width": 448
			}
		]
	},
	"/images/location/crystal.webp": {
		"width": 427,
		"height": 402,
		"variants": [
			{
				"src": "/images/optimized/crystal-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/crystal-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/crystal-384.webp",
				"width": 384
			},
			{
				"src": "/images/optimized/crystal-427.webp",
				"width": 427
			}
		]
	},
	"/images/location/orb.webp": {
		"width": 276,
		"height": 269,
		"variants": [
			{
				"src": "/images/optimized/orb-96.webp",
				"width": 96
			},
			{
				"src": "/images/optimized/orb-192.webp",
				"width": 192
			},
			{
				"src": "/images/optimized/orb-276.webp",
				"width": 276
			}
		]
	},
	"/images/og-qtopia-mat-bang.webp": {
		"width": 1200,
		"height": 630,
		"variants": [
			{
				"src": "/images/optimized/og-qtopia-mat-bang-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/og-qtopia-mat-bang-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/og-qtopia-mat-bang-1200.webp",
				"width": 1200
			}
		]
	},
	"/images/og-qtopia-tien-ich.webp": {
		"width": 1200,
		"height": 630,
		"variants": [
			{
				"src": "/images/optimized/og-qtopia-tien-ich-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/og-qtopia-tien-ich-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/og-qtopia-tien-ich-1200.webp",
				"width": 1200
			}
		]
	},
	"/images/og-qtopia-trang-chu.webp": {
		"width": 1200,
		"height": 630,
		"variants": [
			{
				"src": "/images/optimized/og-qtopia-trang-chu-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/og-qtopia-trang-chu-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/og-qtopia-trang-chu-1200.webp",
				"width": 1200
			}
		]
	},
	"/images/og-qtopia-vi-tri.webp": {
		"width": 1200,
		"height": 630,
		"variants": [
			{
				"src": "/images/optimized/og-qtopia-vi-tri-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/og-qtopia-vi-tri-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/og-qtopia-vi-tri-1200.webp",
				"width": 1200
			}
		]
	},
	"/images/mat-bangq5-q6.webp": {
		"width": 1279,
		"height": 404,
		"variants": [
			{
				"src": "/images/optimized/mat-bangq5-q6-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/mat-bangq5-q6-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/mat-bangq5-q6-1279.webp",
				"width": 1279
			}
		]
	},
	"/images/position-map.webp": {
		"width": 1456,
		"height": 683,
		"variants": [
			{
				"src": "/images/optimized/position-map-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/position-map-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/position-map-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/position-map-1456.webp",
				"width": 1456
			}
		]
	},
	"/images/matbangtienich.webp": {
		"width": 1672,
		"height": 941,
		"variants": [
			{
				"src": "/images/optimized/matbangtienich-480.webp",
				"width": 480
			},
			{
				"src": "/images/optimized/matbangtienich-800.webp",
				"width": 800
			},
			{
				"src": "/images/optimized/matbangtienich-1280.webp",
				"width": 1280
			},
			{
				"src": "/images/optimized/matbangtienich-1672.webp",
				"width": 1672
			}
		]
	}
};
// src/lib/responsive-image.js
function responsiveImageProps(src, imageSizes) {
	const variants = responsive_images_default[src]?.variants;
	return {
		src: variants ? variants[Math.max(0, variants.length - 2)].src : src,
		srcSet: variants?.map((item) => `${item.src} ${item.width}w`).join(", "),
		sizes: variants ? imageSizes || (src.includes("/location/") ? "250px" : src.includes("/brand/") ? "180px" : "100vw") : imageSizes
	};
}
// src/components/ui/Img.jsx
function Img({ src, alt, priority = false, fade = true, className = "", sizes: imageSizes, ...rest }) {
	const dim = image_sizes_default[src];
	const optimized = responsive_images_default[src];
	const imageProps = responsiveImageProps(src, imageSizes);
	const mark = useCallback((el) => {
		if (el?.complete) el.dataset.loaded = "1";
	}, []);
	return /* @__PURE__ */ jsx("img", {
		ref: fade ? mark : void 0,
		...imageProps,
		alt,
		"aria-hidden": alt === "" ? true : void 0,
		width: dim?.[0] || optimized?.width,
		height: dim?.[1] || optimized?.height,
		loading: priority ? "eager" : "lazy",
		decoding: "async",
		fetchPriority: priority ? "high" : void 0,
		"data-img-fade": fade ? "" : void 0,
		onLoad: fade ? (e) => e.currentTarget.dataset.loaded = "1" : void 0,
		className,
		...rest
	});
}
export { responsiveImageProps as n, Img as t };
