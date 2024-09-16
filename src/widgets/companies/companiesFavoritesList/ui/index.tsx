import { Button, Pagination, Table } from "@box/shared/ui";
import { IWithClass } from "@box/types";
import React from "react";
import classNames from "classnames";
import { UsersFavoritesCompaniesListFilters } from "@box/features/company/filters/copmaniesFavorites";
import { useGate, useStore, useUnit } from "effector-react";
import { CompanyCard, CompanyFavoritesRow } from "@box/entities/company";
import { companiesFavoritesListModel } from "@box/widgets/companies/companiesFavoritesList";
import { useOrdering } from "@box/shared/lib/factories";
import { useScreenSize } from "@box/shared/hooks";
import { headers } from "../lib";
import s from "./style.module.scss";

export const UsersFavoritesCompaniesList: React.FC<IWithClass> = ({
  className,
}) => {
  useGate(companiesFavoritesListModel.gate);
  const favoritesCompanies = useStore(
    companiesFavoritesListModel.$favoritesCompaniesList
  );
  const updateInFavorite = useUnit(
    companiesFavoritesListModel.updateCompanyInFavoriteFx
  );
  const ord = useOrdering(companiesFavoritesListModel.ordering);
  const loadingCompanies = useStore(
    companiesFavoritesListModel.favoriteCompaniesLoading.$loaderStore
  );
  const [, satisfies] = useScreenSize();

  const handleChangeisFavorite = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    updateInFavorite({ id });
  };

  return (
    <div className={className}>
      <UsersFavoritesCompaniesListFilters />
      {satisfies("md") ? (
        <Table
          separate
          pagination={
            <Pagination pagination={companiesFavoritesListModel.pagination} />
          }
          loading={loadingCompanies}
          empty={favoritesCompanies.length === 0}
          className={classNames(s.table_view, "mt-[14px]")}
        >
          <Table.Head
            className={s.head}
            headers={headers}
            ordering={ord.ordering}
            onOrderingChange={ord.setOrdering}
          />
          <Table.Body>
            {favoritesCompanies.map((company) => (
              <CompanyFavoritesRow
                key={company.id}
                company={company}
                favoriteButton={
                  <Button
                    onClick={(e) => handleChangeisFavorite(e, company.id)}
                    className="w-[130px]"
                    mode={company.isFavorite ? "stroke" : "fill"}
                    type="mini"
                  >
                      {company.isFavorite ? 'Отписаться' : 'В избранное'}
                  </Button>
                }
              />
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className={s.card_view}>
          <div className={classNames(s.card_view_block)}>
            {favoritesCompanies.map((company) => (
              <CompanyCard
                className={s.card_view_card}
                key={company.id}
                company={company}
                onClickInFavorite={(e) => handleChangeisFavorite(e, company.id)}
              />
            ))}
          </div>
          <Pagination pagination={companiesFavoritesListModel.pagination} />
        </div>
      )}
    </div>
  );
};
