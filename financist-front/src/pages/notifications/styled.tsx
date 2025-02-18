import styled from 'styled-components';

export const NotificationsPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
`;
export const NotificationsPageList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
export const NotificationsPageItem = styled.div<{ read?: boolean }>`
	display: flex;
	gap: 10px;
	align-items: center;
	background-color: ${({ read }) => read ? '' : 'rgba(255, 0, 0, 0.07)'};
	padding: 5px 10px;
	border-radius: 10px;
`;
export const NotificationsPageItemIcon = styled.div`
	width: 36px;
	height: 36px;
	flex: 0 0 36px;
	border-radius: 50%;
	background-color: red;
	display: flex;
	align-items: center;
	justify-content: center;

	& svg {
		color: #fff;
	}
`;
export const NotificationsPageItemText = styled.div`font-weight: 400;`;
export const NotificationsPageItemDate = styled.div``;