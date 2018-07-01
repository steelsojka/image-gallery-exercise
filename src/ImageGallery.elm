import Html exposing (..)
import Html.Attributes exposing (src, class, value)
import Html.Events exposing (onClick, onInput)
import String exposing (trim)
import Array exposing (..)

main =
  Html.beginnerProgram { model = model, view = view, update = update }

-- MODEL

type alias Image =
  { url: String
  , comments: List String
  }

type alias Model =
  { activeImage : Maybe Int
  , images : Array Image
  , pendingComment : String
  }


model : Model
model = {
  pendingComment = "",
  activeImage = Nothing,
  images = Array.fromList [
    { url = "assets/image_1.jpg", comments = [] }
  , { url = "assets/image_2.jpg", comments = [] }
  , { url = "assets/image_3.jpg", comments = [] }
  , { url = "assets/image_4.jpg", comments = [] }
  , { url = "assets/image_5.jpg", comments = [] }
  , { url = "assets/image_6.jpg", comments = [] }
  , { url = "assets/image_7.jpg", comments = [] }
  , { url = "assets/image_8.jpg", comments = [] }
  ]
  }

-- UPDATE

type Msg
    = UpdateActiveImage (Maybe Int)
    | AddComment
    | PendingCommentChanged String

update : Msg -> Model -> Model
update msg model =
  case msg of
    UpdateActiveImage image ->
      { model | activeImage = image }
    AddComment ->
      case model.activeImage of
        Just index -> case Array.get index model.images of
          Just image -> if model.pendingComment /= ""
            then { model |
              images =
                (Array.set index ({ image | comments =
                  (List.append image.comments [ model.pendingComment ]) }) model.images),
              pendingComment = ""
            }
            else
              model
          Nothing -> model
        Nothing -> model
    PendingCommentChanged comment ->
      { model | pendingComment = comment }


-- VIEW

view : Model -> Html Msg
view model =
  div [] [
    viewImageSelector model,
    viewDetails model
  ]

viewImageSelector : Model -> Html Msg
viewImageSelector model =
  node "image-selector" [] [
    div [] (List.indexedMap (viewThumbnail model) (Array.toList model.images))
  ]

viewThumbnail : Model -> Int -> Image -> Html Msg
viewThumbnail model index image =
  let
      selectedClass : String
      selectedClass = case model.activeImage of
        Just activeIndex -> if activeIndex == index then "active" else ""
        Nothing -> ""
  in
    div [class (trim (selectedClass ++ " image-thumbnail"))] [
      img [ src image.url, onClick (UpdateActiveImage (Just index)) ] []
    ]

viewDetails : Model -> Html Msg
viewDetails model =
  let
    maybeImage : Maybe Image
    maybeImage = model.activeImage
      |> Maybe.andThen (\index -> Array.get index model.images)
  in
    node "image-details" [] [
      div [] (case maybeImage of
        Nothing -> [ h1 [] [text "Please select an image"] ]
        Just image -> [
          div [class "image-container"] [
            img [src image.url] []
          ],
          div [class "comments-container"] [
            h4 [] [text "Comments"],
            div [class "comment-list"] (List.map (\comment -> (div [] [text comment])) image.comments),
            div [] [
              textarea [onInput PendingCommentChanged, value model.pendingComment] []
            ],
            div [] [
              button [onClick AddComment] [text "Comment"]
            ]
          ]
        ])
    ]