//* Why did you render
import './wdyr';
import { hot } from 'react-hot-loader/root';

//* Libs
import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

//* Services
import { useFetchOneCallApiQuery, useFetchCurWeatherQuery } from 'services/WeatherServices';

//* Selectors
import { setCurrentName, setWeather, weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppDispatch, useAppSelector } from 'hooks';

// *Components
import Loader from 'components/Loader';

//* Lazy loading components
const HeaderComponent = lazy(() => import('components/Header'));
const SidebarComponent = lazy(() => import('components/Sidebar'));
const WidgetsComponent = lazy(() => import('components/Widgets'));
const MapComponent = lazy(() => import('components/Map'));

const App = () => {
  const { placeRequest } = useAppSelector(weatherSelector);
  const { data: oneCall, isLoading } = useFetchOneCallApiQuery(placeRequest);
  const { data: singleDay } = useFetchCurWeatherQuery(placeRequest);
  const dispatch = useAppDispatch();
  const [sidebarOpened, setSidebarOpened] = useState(false);

  useEffect(() => {
    dispatch(setWeather(oneCall));
    dispatch(setCurrentName(`${singleDay?.name}, ${singleDay?.sys?.country}`));
  }, [dispatch, oneCall, singleDay]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <>
          <SidebarComponent sidebarOpened={sidebarOpened} />
          <div className="content">
            <HeaderComponent setSidebarOpened={setSidebarOpened} sidebarOpened={sidebarOpened} />
            <h2 className="page-title">Todays Highlights</h2>
            <div className="container__content">
              <WidgetsComponent />
              <MapComponent />
            </div>
          </div>
        </>
        <Toaster position="top-right" />
      </Suspense>
    </div>
  );
};

const HootApp = hot(App);

export default HootApp;
