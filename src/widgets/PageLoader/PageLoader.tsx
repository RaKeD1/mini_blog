import cls from './PageLoader.module.scss';
import Loader from "../../components/lib/Loader/Loader";



export const PageLoader = () => (
    <div className={cls.PageLoader}>
        <Loader />
    </div>
);

export default PageLoader;
