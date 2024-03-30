import { memo } from 'react';
import cls from './NotFoundPage.module.scss';


export const NotFoundPage = memo(() => {
    return (
        <div className={cls.NotFoundPage}>
            <p>Страница не найдена</p>
        </div>
    );
});

export default NotFoundPage;
