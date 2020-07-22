import request from './request'

export function getMenu() {
	return request({
		url: '/category'
	})
}

export function getSub(maitKey) {
	return request({
		url: '/subcategory',
		data: {
			maitKey
		}
	})
}

export function getSubtDetail(miniWallkey, type) {
	return request({
		url: '/subcategory/detail',
		data: {
			miniWallkey,
			type
		}
	})
}